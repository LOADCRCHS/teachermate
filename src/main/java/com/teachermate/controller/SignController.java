package com.teachermate.controller;

import com.teachermate.pojo.Sign;
import com.teachermate.service.SignService;
import javafx.beans.binding.ObjectExpression;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Time;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@RequestMapping("/api/v1/")
@RestController
public class SignController {
    @Autowired
    public SignService signService;

    @RequestMapping(value = "class-attendance", method = RequestMethod.POST)
    public Map<String, Object> open_sign(boolean is_gps) {
        return signService.open_sign(is_gps);
    }


    @RequestMapping(value = "class-attendance/{id}", method = RequestMethod.GET)
    public Map<String, Object> get_sign(@PathVariable Integer id, Integer courseId) {
        Map<String, Object> result = new HashMap<>();
        Sign sign1 = signService.select_one(id);


        Map<String, Object> sign = new HashMap<>();
        sign.put("isGps", 0);
        sign.put("isQr", false);
        sign.put("ttl", 299);
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
