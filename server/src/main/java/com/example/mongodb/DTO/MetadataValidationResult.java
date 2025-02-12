package com.example.mongodb.DTO;

import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
public class MetadataValidationResult {
    private String codec;
    private int audioChannels;
    private List<String> warnings;
}
