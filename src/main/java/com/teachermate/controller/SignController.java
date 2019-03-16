package com.teachermate.controller;

import com.teachermate.pojo.Course;
import com.teachermate.pojo.Sign;
import com.teachermate.pojo.SignInfo;
import com.teachermate.pojo.SignInfoDetail;
import com.teachermate.service.CourseService;
import com.teachermate.service.SignService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.text.SimpleDateFormat;
import java.util.*;

@RequestMapping("/api/v1/")
@RestController
public class SignController {
    @Autowired
    public SignService signService;
    @Autowired
    private CourseService courseService;

    @RequestMapping(value = "class-attendance", method = RequestMethod.POST)
    public Map<String, Object> open_sign(Integer is_gps, Integer course_id) {
        return signService.open_sign(is_gps, course_id);
    }


    @RequestMapping(value = "class-attendance/{id}", method = RequestMethod.GET)
    public Map<String, Object> get_sign(@PathVariable Integer id, Integer course_id) {
        Map<String, Object> result = new HashMap<>();
        Sign sign = signService.select_one(id);
        Course course = courseService.select_one(course_id);
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

    @RequestMapping(value = "sign/history_info/{course_id}", method = RequestMethod.GET)
    public List<SignInfo> get_sign_history(@PathVariable Integer course_id) {
//        course_id = 1;
        List<SignInfo> infos = signService.getHistoryInfo(course_id);
        for (SignInfo info : infos) {
            System.out.println("info.date -- " + info.getDate());
            System.out.println("info.count -- " + info.getSum());
            System.out.println("---------------");
            for (SignInfoDetail detail : info.getDetails()) {
                System.out.println(detail.toString());
            }
            System.out.println("---------------");
        }
        return signService.getHistoryInfo(course_id);
    }

}
