package com.example.mongodb.DTO;

import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
public class FileUploadResponse {
    private String id;
    private String filename;
    private long size;
    private String codec;
    private int audioChannels;
    private boolean hasWarnings;
    private List<String> warnings;
    private long dateAdded;
}
