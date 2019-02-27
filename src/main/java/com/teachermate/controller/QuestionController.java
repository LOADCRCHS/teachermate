package com.teachermate.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/question/")
public class QuestionController {
    @RequestMapping("get_answer_detail/{id}")
    public Map<String, Object> get_answer_detail(@PathVariable Integer id, Integer question_id) {
        //2019-02-27 todo 返回的格式修改
        return null;
    }
}
