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

    @RequestMapping(value = "/answer_team_distribution/{courseId}", method = RequestMethod.GET)
    public String getQuestion(@PathVariable Integer courseId, Integer question_id){
        return "{\"data\":{\"0\":{\"stateCount\":[0,0,1],\"name\":\"\\u672a\\u5206\\u7ec4\"}},\"msg\":\"success\"}";
    }

    @RequestMapping(method = RequestMethod.POST)
    public String createQuestion() {
        System.out.println("---------- 1 ---------");
        //questionService.create(question);
        return "{\"id\":4915024,\"type\":3,\"code\":\"T0004\",\"content\":\"<p>1233333</p>\",\"choice\":\"BA\",\"answer\":\"\",\"review\":\"\",\"answerContent\":{\"A\":\"22\",\"B\":\"33\",\"C\":\"44\",\"D\":\"11\"},\"picContent\":{\"A\":\"\",\"B\":\"\",\"C\":\"\",\"D\":\"\"},\"chapterId\":0,\"difficultLevel\":1,\"is_item_score\":1,\"answerOpen\":0,\"onTime\":1,\"answerDuration\":5,\"questionDuration\":null,\"timing\":0,\"openTime\":null,\"lastOpenTime\":null,\"answered\":0,\"teacherId\":1113334,\"strict\":0,\"case_sensitive\":0,\"subNum\":0,\"refNum\":0,\"summary\":\"1233333\",\"cover\":\"\"}";
    }
}
