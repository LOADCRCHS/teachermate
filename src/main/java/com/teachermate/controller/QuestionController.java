package com.teachermate.controller;

import com.teachermate.pojo.Question;
import com.teachermate.service.QuestionService;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/question")
public class QuestionController {
    private QuestionService questionService;
    @RequestMapping(value = "/get_answer_detail/{id}", method = RequestMethod.GET)
    public Map<String, Object> get_answer_detail(@PathVariable Integer id, Integer question_id) {
        // todo 返回的格式修改
        Map<String, Object> result = new HashMap<>();
        Map<String, Object> sign = new HashMap<>();
        sign.put("count", 1);
        result.put("sign", sign);

        return result;
    }
    @RequestMapping(method = RequestMethod.POST)
    public String createQuestion(Question question){
        questionService.create(question);
        return "";
    }
}
