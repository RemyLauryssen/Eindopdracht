package nl.novi.webshop.services;

import nl.novi.webshop.dtos.authentication.UserDTO;
import nl.novi.webshop.entities.AuthorityEntity;
import nl.novi.webshop.entities.UserEntity;
import nl.novi.webshop.exceptions.RecordNotFoundException;
import nl.novi.webshop.repositories.UserRepository;
import nl.novi.webshop.utils.RandomStringGenerator;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    public List<UserDTO> getUsers() {
        List<UserDTO> collection = new ArrayList<>();
        List<UserEntity> list = userRepository.findAll();
        for (UserEntity user : list) {
            collection.add(fromUser(user));
        }
        return collection;
    }

    public UserDTO getUser(String username) {
        UserDTO dto = new UserDTO();
        Optional<UserEntity> user = userRepository.findById(username);
        if (user.isPresent()){
            dto = fromUser(user.get());
        }else {
            throw new UsernameNotFoundException(username);
        }
        return dto;
    }

    public boolean userExists(String username) {
        return userRepository.existsById(username);
    }

    public String createUser(UserDTO userDTO) {
        String randomString = RandomStringGenerator.generateAlphaNumeric(20);
        userDTO.setApikey(randomString);
        UserEntity newUser = userRepository.save(toUser(userDTO));
        return newUser.getUsername();
    }

    public void deleteUser(String username) {
        userRepository.deleteById(username);
    }

    public void updateUser(String username, UserDTO newUser) {
        if (!userRepository.existsById(username)) throw new RecordNotFoundException("Gebruiker niet gevonden");
        UserEntity user = userRepository.findById(username).get();
        user.setPassword(newUser.getPassword());
        userRepository.save(user);
    }

    public Set<AuthorityEntity> getAuthorities(String username) {
        if (!userRepository.existsById(username)) throw new UsernameNotFoundException(username);
        UserEntity user = userRepository.findById(username).get();
        UserDTO userDto = fromUser(user);
        return userDto.getAuthorities();
    }

    public void addAuthority(String username, String authority) {

        if (!userRepository.existsById(username)) throw new UsernameNotFoundException(username);
        UserEntity user = userRepository.findById(username).get();
        user.addAuthority(new AuthorityEntity(username, authority));
        userRepository.save(user);
    }

    public void removeAuthority(String username, String authority) {
        if (!userRepository.existsById(username)) throw new UsernameNotFoundException(username);
        UserEntity user = userRepository.findById(username).get();
        AuthorityEntity authorityToRemove = user.getAuthorities().stream().filter((a) -> a.getAuthority().equalsIgnoreCase(authority)).findAny().get();
        user.removeAuthority(authorityToRemove);
        userRepository.save(user);
    }

    public static UserDTO fromUser(UserEntity user){

        var dto = new UserDTO();

        dto.username = user.getUsername();
        dto.password = user.getPassword();
        dto.enabled = user.isEnabled();
        dto.apikey = user.getApikey();
        dto.email = user.getEmail();
        dto.authorities = user.getAuthorities();

        return dto;
    }

    public UserEntity toUser(UserDTO userDto) {

        var user = new UserEntity();

        user.setUsername(userDto.getUsername());
        user.setPassword(userDto.getPassword());
        user.setEnabled(userDto.getEnabled());
        user.setApikey(userDto.getApikey());
        user.setEmail(userDto.getEmail());

        return user;
    }

}
