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
    public Map<String, Map> class_attendance() {
        Map<String, Map> result = new HashMap<>();
        Map<String, Integer> sign = new HashMap<>();
        sign.put("id", 1436707);
        sign.put("ttl", 299);
        result.put("sign", sign);
        return result;
    }
}
