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
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
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
                        .requestMatchers(HttpMethod.GET, "/", "/menu", "/menu/**", "/products", "/products/*", "/products/*/image/**")
                        .permitAll()
                        .requestMatchers(HttpMethod.POST, "/reservation-details", "/reservation-details/*")
                        .permitAll()
                        .requestMatchers("/swagger-ui/**", "/v3/api-docs/**").permitAll()


                        // USER endpoints
                        .requestMatchers(HttpMethod.GET, "/orders/*")
                        .hasRole("USER")
                        .requestMatchers(HttpMethod.POST, "/orders/**")
                        .hasRole("USER")

                        // ADMIN endpoints
                        .requestMatchers("/admin/**")
                        .hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/products/**")
                        .hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/products/create/**")
                        .hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/menu/**")
                        .hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/reservation-details/*")
                        .hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PATCH, "/reservation-details/*/status")
                        .hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/menu/*")
                        .hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/reservation-details/*")
                        .hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/products/*")
                        .hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/products/*/image")
                        .hasRole("ADMIN")
                        .anyRequest().authenticated()
                )
                .build();
    }

    @Bean
    public JwtAuthenticationConverter jwtAuthenticationConverter() {
        JwtGrantedAuthoritiesConverter scopeConverter = new JwtGrantedAuthoritiesConverter();
        scopeConverter.setAuthorityPrefix("SCOPE_");

        JwtGrantedAuthoritiesConverter realmRoleConverter = new JwtGrantedAuthoritiesConverter();
        realmRoleConverter.setAuthorityPrefix("ROLE_");
        realmRoleConverter.setAuthoritiesClaimName("realm_access.roles");

        JwtAuthenticationConverter converter = new JwtAuthenticationConverter();
        converter.setJwtGrantedAuthoritiesConverter(jwt -> {
            Collection<GrantedAuthority> authorities = new ArrayList<>();
            authorities.addAll(scopeConverter.convert(jwt));

            Map<String, Object> realmAccess = jwt.getClaim("realm_access");
            if (realmAccess != null && realmAccess.get("roles") != null) {
                Collection<String> roles = (Collection<String>) realmAccess.get("roles");
                roles.forEach(role -> authorities.add(
                        new SimpleGrantedAuthority("ROLE_" + role)
                ));
            }

            return authorities;
        });

        return converter;
    }
}
