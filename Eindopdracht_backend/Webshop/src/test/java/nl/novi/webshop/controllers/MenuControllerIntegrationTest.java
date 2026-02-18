package nl.novi.webshop.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import nl.novi.webshop.dtos.menu.MenuRequestDTO;
import nl.novi.webshop.dtos.menu.MenuResponseDTO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ActiveProfiles("test")
@SpringBootTest
@AutoConfigureMockMvc
public class MenuControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    // GET: Alle menu-items
   @Test
    void shouldReturnAllMenuItems() throws Exception {
        mockMvc.perform(get("/menu"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    // GET: Menu-items per ID
    @Test
    @WithMockUser("ADMIN")
    void shouldReturnMenuItemById() throws Exception {
        MenuRequestDTO requestDTO = new MenuRequestDTO();
        requestDTO.setName("Broodje tonijnsalade");
        requestDTO.setDescription("Een lekker broodje tonijnsalade");
        requestDTO.setPrice(3.50);
        requestDTO.setDish("lunch");

        String response = mockMvc.perform(post("/menu")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(requestDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString();

        Long id = objectMapper.readTree(response).get("id").asLong();
    }

    // POST: Menu-item
    @Test
    @WithMockUser(roles = "ADMIN")
    void shouldCreateMenuItem() throws Exception {
        MenuRequestDTO requestDTO = new MenuRequestDTO();
        requestDTO.setName("Broodje makreel");
        requestDTO.setDescription("Een lekker broodje makreel");
        requestDTO.setPrice(12.50);
        requestDTO.setDish("lunch");

        mockMvc.perform(post("/menu")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(requestDTO)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.name").value("Broodje makreel"));
    }

   // PUT: Menu-item
    @Test
    @WithMockUser(roles = "ADMIN")
    void shouldUpdateMenuItem() throws Exception {
        MenuRequestDTO requestDTO = new MenuRequestDTO();
        requestDTO.setName("Gebakje");
        requestDTO.setDescription("Een lekker gebakje");
        requestDTO.setPrice(2.50);
        requestDTO.setDish("pastries");

        String response = mockMvc.perform(post("/menu")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(requestDTO)))
                .andReturn()
                .getResponse()
                .getContentAsString();

        Long id = objectMapper.readTree(response).get("id").asLong();

        requestDTO.setName("Cakeje");
        requestDTO.setPrice(1.50);

        mockMvc.perform(put("/menu/" + id)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(requestDTO)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Cakeje"))
                .andExpect(jsonPath("$.price").value(1.50));
    }

    // DELETE: menu-item
    @Test
    @WithMockUser(roles = "ADMIN")
    void shouldDeleteMenuItem() throws Exception {
        MenuRequestDTO requestDTO = new MenuRequestDTO();
        requestDTO.setName("Biertje");
        requestDTO.setDescription("Lekker biertje");
        requestDTO.setPrice(3.00);
        requestDTO.setDish("drinks");

        String response = mockMvc.perform(post("/menu")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(requestDTO)))
                .andReturn()
                .getResponse()
                .getContentAsString();

        Long id = objectMapper.readTree(response).get("id").asLong();

        mockMvc.perform(delete("/menu/" + id))
                .andExpect(status().isNoContent());
    }
}
