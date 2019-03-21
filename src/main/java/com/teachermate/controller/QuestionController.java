package com.teachermate.controller;

import com.teachermate.pojo.Question;
import com.teachermate.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/question")
public class QuestionController {
    @Autowired
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
    public String getQuestion(@PathVariable Integer courseId, Integer question_id) {
        return "{\"data\":{\"0\":{\"stateCount\":[0,0,1],\"name\":\"\\u672a\\u5206\\u7ec4\"}},\"msg\":\"success\"}";
    }

    @RequestMapping(method = RequestMethod.POST)
    public Question createQuestion(Integer type, Integer course_id, Integer chapter_id
            , Integer difficult_level, String content, boolean strict, boolean case_sensitive
            , String answers
            , @RequestParam("answer_type[]") String[] answer_type
            , Integer teacherId, String answer_content, String pic_content, HttpServletRequest request) {

        Question question = new Question();
        String[] answerArray;
        if (answers == null) {
            Map<String, String[]> parameterMap = request.getParameterMap();
            answerArray = parameterMap.get("answers[]");
        } else {
            answerArray = new String[]{answers};
        }
        question.setType(type);
        question.setCourse_id(course_id);
        question.setDifficult_level(difficult_level);
        question.setContent(content);
        question.setAnswers(answerArray);
        question.setChapter_id(chapter_id);
        question.setAnswer_type(answer_type);
        question.setTeacherId(teacherId);
        question.setAnswer_content(answer_content);
        question.setPic_content(pic_content);
        question.setStrict(strict);
        question.setCase_sensitive(case_sensitive);
        question.setCode(type);
        questionService.create(question);

        return question;
    }
}
