package com.teachermate.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;

@RequestMapping("/api/v1/")
@Controller
public class ApiV1Controller {
    @ResponseBody()
    @RequestMapping("class-attendance")
    public Map<String,Integer> class_attendance(){
        Map<String,Integer> sign = new HashMap<>();
        sign.put("id",1436707);
        sign.put("ttl",299);
        return sign;
    }
}
