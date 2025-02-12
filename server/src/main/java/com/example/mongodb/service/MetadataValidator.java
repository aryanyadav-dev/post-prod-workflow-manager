package com.example.mongodb.service;

import com.example.mongodb.config.MetadataConfig;
import com.example.mongodb.DTO.MetadataValidationResult;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MetadataValidator {

    public MetadataValidationResult validate(MultipartFile file, MetadataConfig metadataConfig) {
        MetadataValidationResult result = new MetadataValidationResult();
        List<String> warnings = new ArrayList<>();

        // Extract metadata (this should be replaced with actual metadata extraction logic)
        String extractedCodec = extractCodec(file);
        int extractedAudioChannels = extractAudioChannels(file);

        // Validate codec
        if (!metadataConfig.getAllowedCodecs().contains(extractedCodec)) {
            warnings.add("Invalid codec: " + extractedCodec);
        }

        // Validate audio channels
        if (!metadataConfig.getAllowedAudioChannels().contains(extractedAudioChannels)) {
            warnings.add("Invalid audio channels: " + extractedAudioChannels);
        }

        // Set validation results
        result.setCodec(extractedCodec);
        result.setAudioChannels(extractedAudioChannels);
        result.setWarnings(warnings);

        return result;
    }

    private String extractCodec(MultipartFile file) {
        // Dummy function to simulate metadata extraction
        // Replace this with actual media metadata extraction logic
        return "H.264"; // Default return value for testing
    }

    private int extractAudioChannels(MultipartFile file) {
        // Dummy function to simulate audio channel extraction
        // Replace this with actual media metadata extraction logic
        return 2; // Default return value for testing
    }
}
