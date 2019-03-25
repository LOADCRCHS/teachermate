package com.teachermate.service;

import com.teachermate.pojo.Question;

import java.util.List;

public interface QuestionService {
    void create(Question question);

    List<Question> getQues(Integer courseId);
}
