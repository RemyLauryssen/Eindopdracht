package nl.novi.webshop.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import nl.novi.webshop.dtos.reservationDetails.ReservationDetailsRequestDTO;
import nl.novi.webshop.dtos.reservationDetails.ReservationStatusUpdateDTO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ActiveProfiles("test")
@AutoConfigureMockMvc
@SpringBootTest
public class ReservationControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    // POST: ReservationDetails
    @Test
    void shouldCreateReservationDetails() throws Exception {

        ReservationDetailsRequestDTO requestDTO = new ReservationDetailsRequestDTO();
        requestDTO.setFirstName("Roos");
        requestDTO.setLastName("Visser");
        requestDTO.setEmailAddress("roosvisser@email.nl");
        requestDTO.setNumberOfGuests(2);
        requestDTO.setReservationDateTime(LocalDateTime.now());

        mockMvc.perform(post("/reservation-details")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(requestDTO)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.firstName").value("Roos"))
                .andExpect(jsonPath("$.lastName").value("Visser"))
                .andExpect(jsonPath("$.emailAddress").value("roosvisser@email.nl"))
                .andExpect(jsonPath("$.numberOfGuests").value(2))
                .andExpect(jsonPath("$.status").value("PENDING"));
    }

    // GET: ReservationDetails
    @Test
    @WithMockUser(roles = "ADMIN")
    void shouldReturnAllReservationDetails() throws Exception {
        mockMvc.perform(get("/reservation-details"))
                .andExpect(status().isOk());
    }

    //GET: ReservationDetails per ID
    @Test
    @WithMockUser(roles = "ADMIN")
    void shouldReturnReservationDetailsById() throws Exception {
        ReservationDetailsRequestDTO requestDTO = createValidReservationDTO("Jan", "Bakker", "janbakker@email.nl");

        String response = mockMvc.perform(post("/reservation-details")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(requestDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString();

        Long id = (Long) objectMapper.readTree(response).get("id").asLong();

        mockMvc.perform(get("/reservation-details/" + id))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(id));
    }

    // PUT: bijgewerkte ReservationDetails
    @Test
    @WithMockUser(roles = "ADMIN")
    void shouldUpdateReservationDetails() throws Exception {
        ReservationDetailsRequestDTO requestDTO = new ReservationDetailsRequestDTO();
        requestDTO.setFirstName("Oorspronkelijke");
        requestDTO.setLastName("Naam");
        requestDTO.setEmailAddress("original@email.nl");
        requestDTO.setNumberOfGuests(2);
        requestDTO.setReservationDateTime(LocalDateTime.now());

        String response = mockMvc.perform(post("/reservation-details")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(requestDTO)))
                .andReturn()
                .getResponse()
                .getContentAsString();

        Long id = (Long) objectMapper.readTree(response).get("id").asLong();

        requestDTO.setFirstName("Nieuwe");
        requestDTO.setLastName("Tweede Naam");

        mockMvc.perform(put("/reservation-details/" + id)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(requestDTO)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.firstName").value("Nieuwe"))
                .andExpect(jsonPath("$.lastName").value("Tweede Naam"))
                .andExpect(jsonPath("$.emailAddress").value("original@email.nl"))
                .andExpect(jsonPath("$.numberOfGuests").value(2))
                .andExpect(jsonPath("$.status").value("PENDING"));
    }

   // PATCH: Reserveringsstatus
    @Test
    @WithMockUser(roles = "ADMIN")
    void shouldUpdateReservationStatus() throws Exception {
        ReservationDetailsRequestDTO requestDTO = createValidReservationDTO("Status", "Controle", "statuscontrole@email.nl");

        String response = mockMvc.perform(post("/reservation-details")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(requestDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString();

        Long id = (Long) objectMapper.readTree(response).get("id").asLong();

        ReservationStatusUpdateDTO statusDTO = new ReservationStatusUpdateDTO();
        statusDTO.setStatus("APPROVED");

        mockMvc.perform(patch("/reservation-details/" + id + "/status")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(statusDTO)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("APPROVED"));
    }

    //DELETE: ReservationDetails
    @Test
    @WithMockUser(roles = "ADMIN")
    void shouldDeleteReservationDetails() throws Exception {
        ReservationDetailsRequestDTO requestDTO = createValidReservationDTO("Verwijder", "Controle", "verwijder@email.com");

        String response = mockMvc.perform(post("/reservation-details")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(requestDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString();

        Long id = (Long) objectMapper.readTree(response).get("id").asLong();

        mockMvc.perform(delete("/reservation-details/" + id))
                .andExpect(status().isNoContent());
    }


    private ReservationDetailsRequestDTO createValidReservationDTO(String firstName, String lastName, String email) {
        ReservationDetailsRequestDTO dto = new ReservationDetailsRequestDTO();
        dto.setFirstName(firstName);
        dto.setLastName(lastName);
        dto.setEmailAddress(email);
        dto.setReservationDateTime(LocalDateTime.now().plusDays(1));
        dto.setNumberOfGuests(2);
        return dto;
    }
}