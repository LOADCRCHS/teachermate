package com.teachermate.controller;

import com.teachermate.pojo.Course;
import com.teachermate.pojo.Sign;
import com.teachermate.service.CourseService;
import com.teachermate.service.SignService;
import com.teachermate.service.impl.SignServiceImpl;
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
    @Autowired
    private CourseService courseService;

    @RequestMapping(value = "class-attendance", method = RequestMethod.POST)
    public Map<String, Object> open_sign(Integer is_gps) {
        return signService.open_sign(is_gps);
    }


    @RequestMapping(value = "class-attendance/{id}", method = RequestMethod.GET)
    public Map<String, Object> get_sign(@PathVariable Integer id, Integer courseid) {
        Map<String, Object> result = new HashMap<>();
        Sign sign = signService.select_one(id);
        Course course = courseService.select_one(courseid);
        result.put("signInLogs", new ArrayList<>());
        result.put("sign", sign);
        // todo course对象里因包含当前课程的所有学生，和所有分组
        result.put("course", course);
        return result;
    }

    @RequestMapping(value = "class-attendance/{id}/close", method = RequestMethod.PUT)
    public Map<String, Object> class_attendance_close(@PathVariable Integer id) {
        Map<String, Object> result = new HashMap<>();
        Sign sign = signService.close(id);
        result.put("sign", sign);
        return result;
    }

    @RequestMapping(value = "sign/history_info", method = RequestMethod.GET)
    public Map<String, Object> get_sign_history() {
        Map<String, Object> result = new HashMap<>();
        result.put("count", "3");
        return result;
    }

}
