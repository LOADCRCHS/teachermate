package com.teachermate.controller;

import javafx.beans.binding.ObjectExpression;
import org.springframework.web.bind.annotation.*;

import java.sql.Time;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@RequestMapping("/api/v1/")
@RestController
public class ApiV1Controller {
    @RequestMapping(value = "class-attendance", method = RequestMethod.POST)
    public Map<String, Map> class_attendance_post() {
        Map<String, Map> result = new HashMap<>();
        Map<String, Object> sign = new HashMap<>();
        sign.put("id", 1436707);
        sign.put("ttl", 299);
        result.put("sign", sign);
        return result;
    }


    @RequestMapping(value = "class-attendance/{id}", method = RequestMethod.GET)
    public Map<String, Object> class_attendance_get(@PathVariable Integer id, @RequestParam("courseid") Integer courseId) {
        Map<String, Object> result = new HashMap<>();
        Map<String, Object> sign = new HashMap<>();
        sign.put("isGps", 0);
        sign.put("isQr", false);
        sign.put("ttl", 291);
        sign.put("count", 0);
        Map<String, Object> course = new HashMap<>();
        course.put("students", new ArrayList<>());
        course.put("teams", new ArrayList<>());
        result.put("signInLogs", new ArrayList<>());
        result.put("sign", sign);
        result.put("course", course);
        return result;
    }

    @RequestMapping(value = "class-attendance/{id}/close", method = RequestMethod.PUT)
    public Map<String, Object> class_attendance_close() {
        Map<String, Object> result = new HashMap<>();
        Map<String, Object> sign = new HashMap<>();
        sign.put("signId", "1438416");
        sign.put("rank", 3);
        sign.put("date", "2019-02-27 22:20:24.000");
        sign.put("isGps", 0);
        sign.put("isQr", false);
        sign.put("count", 0);
        sign.put("ratio", 0);
        result.put("sign", sign);
        return result;
    }

}
