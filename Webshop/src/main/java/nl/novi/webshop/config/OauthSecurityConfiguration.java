package nl.novi.webshop.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.core.DelegatingOAuth2TokenValidator;
import org.springframework.security.oauth2.core.OAuth2TokenValidator;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

@Configuration
public class OauthSecurityConfiguration {

    @Value("${client-id}")
    private String clientId;

    @Value("${audience}")
    private String audience;

    @Value("${issuer-uri}")
    private String issuer;

    private UrlBasedCorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowedOrigins(List.of("*"));
        corsConfiguration.setAllowedMethods(List.of("*"));
        corsConfiguration.setAllowedHeaders(List.of("*"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);
        return source;
    }


    @Bean
    public SecurityFilterChain config(HttpSecurity http) throws Exception {
        return http
                .httpBasic(AbstractHttpConfigurer::disable)
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(AbstractHttpConfigurer::disable)
                .oauth2ResourceServer(oauth2 -> oauth2
                        .jwt(jwt -> jwt.jwtAuthenticationConverter(jwtAuthenticationConverter()))
                )
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/", "/menu", "/menu/*", "/products", "/products/*", "/products/*/image/**")
                        .permitAll()
                        .requestMatchers(HttpMethod.POST, "/reservation-details")
                        .permitAll()

                        // USER endpoints
                        .requestMatchers(HttpMethod.GET, "/orders/*")
                        .hasAuthority("USER")
                        .requestMatchers(HttpMethod.POST, "/orders/**")
                        .hasAuthority("USER")

                        // ADMIN endpoints
                        .requestMatchers("/admin/**")
                        .hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/products/**")
                        .hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/products/create/**")
                        .hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/menu/**")
                        .hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/reservation-details/*")
                        .hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.PATCH, "/reservation-details/*/status")
                        .hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/menu/*")
                        .hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/reservation-details/*")
                        .hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/products/*")
                        .hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/products/*/image")
                        .hasAuthority("ADMIN")
                        .anyRequest().authenticated()
                )
                .build();
    }

    @Bean
    public JwtAuthenticationConverter jwtAuthenticationConverter() {

        JwtAuthenticationConverter converter = new JwtAuthenticationConverter();
        converter.setJwtGrantedAuthoritiesConverter(new Converter<Jwt, Collection<GrantedAuthority>>() {

            @Override
            public Collection<GrantedAuthority> convert(Jwt jwt) {
                Collection<GrantedAuthority> authorities = new ArrayList<>();
                for (String role : extractRoles(jwt)) {
                    authorities.add(new SimpleGrantedAuthority(role.toUpperCase()));
                }
                return authorities;
            }

            @SuppressWarnings("unchecked")
            private List<String> extractRoles(Jwt jwt) {

                Map<String, Object> resourceAccess =
                        jwt.getClaim("resource_access");

                if (resourceAccess != null) {
                    Object clientAccess = resourceAccess.get(clientId);
                    if (clientAccess instanceof Map<?, ?> clientMap) {
                        Object roles = clientMap.get("roles");
                        if (roles instanceof List<?> roleList) {
                            return roleList.stream()
                                    .map(String.class::cast)
                                    .toList();
                        }
                    }
                }

                Map<String, Object> realmAccess =
                        jwt.getClaim("realm_access");

                if (realmAccess != null) {
                    Object roles = realmAccess.get("roles");
                    if (roles instanceof List<?> roleList) {
                        return roleList.stream()
                                .map(String.class::cast)
                                .toList();
                    }
                }

                return List.of();
            }
        });

        return converter;
    }
}
