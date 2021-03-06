package com.teachermate.dao;

import com.teachermate.pojo.Question;

import java.util.List;

public interface QuestionDao {
    void create(Question question);

    List<Question> selectByCourseId(Integer courseId);

    Question selectById(Integer question_id);

    void update(Question question);

    void delete(Integer question_id);
}
