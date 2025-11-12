package com.entornos.v2_maven.Reponse;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ResponseArchivo {
    private String nombreArchivo;
    private String tipoArchivo;
    private String url;
    private long size;
}
