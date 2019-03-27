package com.teachermate.service;

import com.teachermate.pojo.Question;

import java.util.List;
import java.util.Map;

public interface QuestionService {
    void create(Question question);

    List<Question> getQues(Integer courseId);

    Map<String, Object> selectById(Integer course_id, Integer question_id);

    void create_or_update(Question question);

    void delete(Integer question_id, Integer course_id, Integer release);
}
