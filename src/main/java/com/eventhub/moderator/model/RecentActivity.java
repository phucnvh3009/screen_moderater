package com.eventhub.moderator.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "recent_activities")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecentActivity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String activityId;
    private String type; // 'event_submitted' | 'organizer_verified' | 'event_flagged'
    private String title;
    private String subtitle;
    private String time;
    private String avatarUrl;
    private String avatarAlt;
    private String eventId;
    private String organizerId;
}