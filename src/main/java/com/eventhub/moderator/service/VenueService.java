package com.eventhub.moderator.service;

import com.eventhub.moderator.model.VenueDetail;
import com.eventhub.moderator.repository.VenueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class VenueService {
    @Autowired
    private VenueRepository venueRepository;
    
    public List<VenueDetail> getAllVenues() {
        return venueRepository.findAll();
    }
    
    public Optional<VenueDetail> getVenueById(String venueId) {
        return venueRepository.findByVenueId(venueId);
    }
    
    public List<VenueDetail> searchVenues(String query) {
        return venueRepository.findByNameContainingIgnoreCaseOrAddressContainingIgnoreCase(query, query);
    }
}