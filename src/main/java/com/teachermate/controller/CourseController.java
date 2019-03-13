package com.teachermate.controller;

import com.teachermate.pojo.Sign;
import com.teachermate.service.SignService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/course/")
public class CourseController {
    @Autowired
    private SignService signService;

    @RequestMapping(value = "{id}",method = RequestMethod.GET)
    public Map<String, Object> course_info(@PathVariable Integer id){
        return null;
    }

    @RequestMapping(value = "{id}/grades")
    public Map<String, Object> grades_info(){
        return null;
    }

    @RequestMapping("his_sign/{id}")
    public Map<String, Object> close_sign_view(@PathVariable Integer id) {
        Map<String, Object> result = new HashMap<>();
        Sign sign = signService.countMinAndSec(signService.select_one(id));

        result.put("data", sign);
        result.put("msg", "success");
        return result;
    }
}
