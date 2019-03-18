package com.teachermate.util;

import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.io.StringWriter;

public class JsonUtil {

    private static ObjectMapper mapper = new ObjectMapper();

    public static <T> String toJson(T t) {
        StringWriter stringWriter = new StringWriter();
        try(JsonGenerator jsonGenerator = new JsonFactory().createGenerator(stringWriter)) {
            mapper.writeValue(jsonGenerator,t);
        } catch (IOException e) {
            e.printStackTrace();
            return "{\"msg\":\"Jackson Error\"}";
        }
        return stringWriter.toString();
    }

    public static <T> T toObject(String string, Class<T> clazz) {
        try {
            return mapper.readValue(string,clazz);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}
