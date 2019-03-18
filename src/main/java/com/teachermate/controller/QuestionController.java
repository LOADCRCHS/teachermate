package com.teachermate.controller;

import com.teachermate.pojo.Question;
import com.teachermate.service.QuestionService;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
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
    public String getQuestion(@PathVariable Integer courseId, Integer question_id) {
        return "{\"data\":{\"0\":{\"stateCount\":[0,0,1],\"name\":\"\\u672a\\u5206\\u7ec4\"}},\"msg\":\"success\"}";
    }

    @RequestMapping(method = RequestMethod.POST)
    public String createQuestion(Integer type, Integer course_id, Integer chapter_id
            , Integer difficult_level, String content, String[] answers
            , boolean strict, boolean case_sensitive
            , String[] answer_type, Integer teacherId
            , String answer_content, String pic_content) {
        Question question = new Question();
        question.setType(type);
        question.setCourse_id(course_id);
        question.setDifficult_level(difficult_level);
        question.setContent(content);
        question.setAnswers(answers);
        question.setChapter_id(chapter_id);
        question.setAnswer_type(answer_type);
        question.setTeacherId(teacherId);
        question.setAnswer_content(answer_content);
        question.setPic_content(pic_content);
        question.setStrict(strict);
        question.setCase_sensitive(case_sensitive);
        questionService.create(question);

        return "{\",id\\\":4915024\"type\":3,\"code\":\"T0004\",\"content\":\"<p>1233333</p>\",\"choice\":\"BA\",\"answer\":\"\",\"review\":\"\",\"answerContent\":{\"A\":\"22\",\"B\":\"33\",\"C\":\"44\",\"D\":\"11\"},\"picContent\":{\"A\":\"\",\"B\":\"\",\"C\":\"\",\"D\":\"\"},\"chapterId\":0,\"difficultLevel\":1,\"is_item_score\":1,\"answerOpen\":0,\"onTime\":1,\"answerDuration\":5,\"questionDuration\":null,\"timing\":0,\"openTime\":null,\"lastOpenTime\":null,\"answered\":0,\"teacherId\":1113334,\"strict\":0,\"case_sensitive\":0,\"subNum\":0,\"refNum\":0,\"summary\":\"1233333\",\"cover\":\"\"}";
    }
}
