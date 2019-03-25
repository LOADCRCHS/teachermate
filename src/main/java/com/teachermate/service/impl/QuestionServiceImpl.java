package com.teachermate.service.impl;

import com.teachermate.dao.QuestionDao;
import com.teachermate.pojo.Question;
import com.teachermate.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionServiceImpl implements QuestionService {
    @Autowired
    private QuestionDao questionDao;

    @Override
    public void create(Question question) {
        questionDao.create(question);
    }

    @Override
    public List<Question> getQues(Integer courseId) {
        return questionDao.selectByCourseId(courseId);
    }
}
