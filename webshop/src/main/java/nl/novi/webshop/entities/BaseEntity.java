package nl.novi.webshop.entities;

import jakarta.persistence.*;

import java.time.LocalDateTime;


@MappedSuperclass
public abstract class BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column (name = "date_created", updatable = false)
    private LocalDateTime dateCreated;

    @Column(name = "date_edited")
    private LocalDateTime dateEdited;

    @PrePersist
    protected void onCreate() {
        dateCreated = LocalDateTime.now();
        dateEdited = dateCreated;
    }

    @PreUpdate
    protected void onUpdate() {
        dateEdited = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(LocalDateTime dateCreated) {
        this.dateCreated = dateCreated;
    }

    public LocalDateTime getDateEdited() {
        return dateEdited;
    }

    public void setDateEdited(LocalDateTime dateEdited) {
        this.dateEdited = dateEdited;
    }
}
