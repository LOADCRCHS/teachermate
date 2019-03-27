package com.teachermate.service.impl;

import com.teachermate.dao.CourseDao;
import com.teachermate.dao.QuestionDao;
import com.teachermate.pojo.Course;
import com.teachermate.pojo.Question;
import com.teachermate.service.QuestionService;
import com.teachermate.util.JsonUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class QuestionServiceImpl implements QuestionService {
    @Autowired
    private QuestionDao questionDao;
    @Autowired
    private CourseDao courseDao;

    @Override
    public void create(Question question) {
        questionDao.create(question);
    }

    @Override
    public List<Question> getQues(Integer courseId) {
        return questionDao.selectByCourseId(courseId);
    }

    @Override
    public Map<String, Object> selectById(Integer course_id, Integer question_id) {
        Map<String, Object> result = new HashMap<>();
        Course course = courseDao.select_one(course_id);
        Question question = questionDao.selectById(question_id);

        if (false && question == null || question.getCourse_id().equals(course_id)) {
            return null;
        }

        result.put("answer", question.getAnswers());
        result.put("answer_content", JsonUtil.getObject(question.getAnswer_content(), HashMap.class));
        result.put("answer_duration", question.getAnswer_duration());
        result.put("answered", question.getIs_answered());
        result.put("case_sensitive", question.getCase_sensitive());
        result.put("chapter_id", question.getChapter_id());
        result.put("content", question.getContent());
        result.put("difficulty", question.getDifficult_level());
        result.put("is_item_score", question.getIs_item_score());
        result.put("library_id", question.getLibrary_id());
        result.put("pic_content", JsonUtil.getObject(question.getPic_content(), HashMap.class));
        result.put("question_id", question.getId());
        result.put("strict", question.getStrict());
        result.put("type", question.getType() + "");

        result.put("course_info", course);

        return result;
    }
}
