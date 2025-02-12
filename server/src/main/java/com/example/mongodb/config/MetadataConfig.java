package com.example.mongodb.config;

import lombok.Data;
import java.util.List;

@Data
public class MetadataConfig {
    private List<String> allowedCodecs;
    private List<String> allowedResolutions;
    private List<Integer> allowedAudioChannels;
}