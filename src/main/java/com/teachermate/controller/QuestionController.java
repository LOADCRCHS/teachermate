package com.teachermate.controller;

import com.teachermate.pojo.Question;
import com.teachermate.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
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
            , String answers, Integer question_id
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
        question.setId(question_id);
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
        questionService.create_or_update(question);

        return question;
    }

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public Map<String, Object> list(Integer courseId) {
        courseId = 1080176;
        Map<String, Object> result = new HashMap<>();
        List<Question> questions = questionService.getQues(courseId);
        Map<String, Object> course_info = new HashMap<>();
        course_info.put("course_id", "1080176");
        course_info.put("name", "233");
        course_info.put("library_id", "91327");
        course_info.put("duration_rule", "5");
        course_info.put("answer_open_rule", "1");
        result.put("single", questions);
        result.put("course_info", course_info);

        return result;
    }

    @RequestMapping("/get_que/{courseId}")
    public String get_que(@PathVariable Integer courseId, Integer question_id) {
        System.out.println("------------------");
        System.out.println("courseId: " + courseId);
        System.out.println("question_id: " + question_id);
        return "{\"data\":{\"answerDistribution\":{\"0\":{\"stateCount\":[1,0,0],\"name\":\"\\u672a\\u5206\\u7ec4\"}},\"tpl\":\"<div class=\\\"right-area-scroll \\\">\\n    <input type=\\\"hidden\\\" id=\\\"question-type\\\" value=\\\"2\\\">\\n    <input type=\\\"hidden\\\" id=\\\"question-duration\\\" value=\\\"1\\\">\\n    <input type=\\\"hidden\\\" id=\\\"question-id\\\" value=\\\"4944168\\\">\\n            <input type=\\\"hidden\\\" id=\\\"leave-time\\\" value=\\\"-590235\\\">\\n        <input type=\\\"hidden\\\" id=\\\"question-open\\\" value=\\\"2\\\">\\n        <input type=\\\"hidden\\\" id=\\\"question-exp-open\\\" value=\\\"0\\\">\\n        <div class=\\\"question-wrap card\\\">\\n    <div class=\\\"question-content\\\">\\n    <span class=\\\"open-state teal btn-arc hidden\\\">\\u5f00\\u542f\\u4e2d<\\/span>\\n    <div class=\\\"question-cont\\\">\\n        <div class=\\\"font-size-turner\\\" ctrl=\\\"question-content\\\">\\n            <button class=\\\"normal\\\">A<\\/button>\\n            <button class=\\\"larger\\\">A<\\/button>\\n        <\\/div>\\n        <span class=\\\"question-type tip-badge \\n                    yellow-badge white-text\\n                \\\">T0008 \\u586b\\u7a7a\\u9898<\\/span>\\n                                                            <span class=\\\"item-tag\\\"> \\u6bcf\\u7a7a\\u72ec\\u7acb\\u7ed9\\u5206 <\\/span>\\n                                    <span class=\\\"ml-10\\\"><\\/span>\\n        <div>\\n            <span class=\\\"ml-10\\\" >\\n                <p>asdf<\\/p><hr><p>____ ____ ____ ____ ____ ____&nbsp;<\\/p>\\n            <\\/span>\\n        <\\/div>\\n            <\\/div>\\n    <div class=\\\"answer-cont\\\">\\n        <\\/div>\\n    <div class=\\\"answer-cont\\\">\\n                    <\\/div>\\n<\\/div>\\n\\n    <div class=\\\"buttons btns-close \\\">\\n            <a class=\\\"edit teal-text btn-edit btn-edit-question\\\">\\u7f16\\u8f91<\\/a>\\n                    <a class=\\\"edit teal-text btn-edit btn-copy-question\\\">\\u514b\\u9686<\\/a>\\n                <a class=\\\"edit teal-text btn-edit btn-del-question\\\">\\u5220\\u9664<\\/a>\\n        <a class=\\\"edit teal-text btn-edit btn-answer-review\\\">\\u5c55\\u5f00\\u7b54\\u6848\\u548c\\u89e3\\u6790<\\/a>\\n                <div class=\\\"pull-right\\\">\\n            <div class=\\\"inline-block grey-text time-opening\\\">\\n                <svg class=\\\"inline-middle\\\" fill=\\\"#c8c8c8\\\" height=\\\"24\\\" viewBox=\\\"0 0 24 24\\\" width=\\\"24\\\" xmlns=\\\"http:\\/\\/www.w3.org\\/2000\\/svg\\\">\\n                    <path d=\\\"M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z\\\"\\/>\\n                    <path d=\\\"M0 0h24v24H0z\\\" fill=\\\"none\\\"\\/>\\n                    <path d=\\\"M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z\\\"\\/>\\n                <\\/svg>\\n                <span class=\\\"inline-block timing-open-info\\\">\\u6307\\u5b9a\\u5f00\\u542f\\u65f6\\u95f4<\\/span>\\n                <div class=\\\"row date-card\\\">\\n    <div class=\\\"col s12 m12\\\">\\n        <div class=\\\"card teal z-depth-4\\\">\\n            <div class=\\\"card-content white-text\\\">\\n                <p>\\u6307\\u5b9a\\u5f00\\u542f\\u65f6\\u95f4<\\/p>\\n                <input type=\\\"text\\\" class=\\\"datepicker white-text inline-block\\\" \\/>\\n                <input value=\\\"20\\\" name=\\\"hour\\\" type=\\\"text\\\" class=\\\"validate\\\" \\/>\\n                <span>:<\\/span>\\n                <input value=\\\"00\\\" name=\\\"minute\\\" type=\\\"text\\\" class=\\\"validate\\\" \\/>\\n                 \\n            <\\/div>\\n            <div class=\\\"card-action white align-right\\\">\\n                <a class=\\\"teal-text btn-timing-cancle\\\">\\u53d6\\u6d88<\\/a>\\n                <a class=\\\"teal-text btn-timing-confirm\\\">\\u786e\\u5b9a<\\/a>\\n            <\\/div>\\n            <input type=\\\"hidden\\\" id=\\\"timing-open\\\" value=\\\"\\\" \\/>\\n        <\\/div>\\n    <\\/div>\\n<\\/div>\\n            <\\/div>\\n            <div class=\\\"inline-block teal-text time-limit mr-20\\\">\\n                <input type=\\\"checkbox\\\" class=\\\"filled-in\\\" id=\\\"filled-in-box\\\" checked=\\\"checked\\\" \\/>\\n                <label for=\\\"filled-in-box\\\" class=\\\"btn-time-limit\\\"><\\/label>\\n                <span class=\\\"inline-block time-limit-info\\\">\\u9650\\u65f6<span class=\\\"underline\\\">5<\\/span>\\u5206\\u949f<\\/span>\\n                <div class=\\\"row time-card\\\">\\n    <div class=\\\"col s12 m12\\\">\\n        <div class=\\\"card teal z-depth-4\\\">\\n            <div class=\\\"card-content white-text\\\">\\n                <p>\\u8bbe\\u5b9a\\u9650\\u65f6<\\/p>\\n                <input type=\\\"text\\\" class=\\\"input-time validate white-text align-right\\\" value=\\\"5\\\">\\n                <label class=\\\"white-text ml-10 font-20\\\">\\u5206\\u949f<\\/label>\\n            <\\/div>\\n            <div class=\\\"card-action white align-right\\\">\\n                <a class=\\\"teal-text btn-limit-cancle\\\">\\u53d6\\u6d88<\\/a>\\n                <a class=\\\"teal-text btn-limit-default\\\">\\u4fdd\\u5b58\\u4e3a\\u9ed8\\u8ba4\\u503c<\\/a>\\n                <a class=\\\"teal-text btn-limit-confirm\\\">\\u786e\\u5b9a<\\/a>\\n            <\\/div>\\n            <input type=\\\"hidden\\\" id=\\\"time-limit\\\" value=\\\"\\\" \\/>\\n        <\\/div>\\n    <\\/div>\\n<\\/div>\\n            <\\/div>\\n            <div class=\\\"openQuestionBtn waves-effect waves-light btn teal extend-btn\\\">\\n                <a class=\\\"btn-open inner-btn\\\" href=\\\"javascript:void(0);\\\">\\u91cd\\u65b0\\u5f00\\u542f\\u9898\\u76ee<\\/a>\\n                            <\\/div>\\n            <a class=\\\"startTimerBtn btn-open waves-effect waves-light btn teal\\\">\\u542f\\u52a8\\u5b9a\\u65f6<\\/a>\\n        <\\/div>\\n    <\\/div>\\n            <div class=\\\"buttons btns-opening teal lighten-5 align-right hidden\\\">\\n    <div class=\\\"inline-block time-leave grey-text text-darken-3 \\\">\\n        <svg class=\\\"inline-middle\\\" fill=\\\"#4a4a4a\\\" height=\\\"24\\\" viewBox=\\\"0 0 24 24\\\" width=\\\"24\\\" xmlns=\\\"http:\\/\\/www.w3.org\\/2000\\/svg\\\">\\n            <path d=\\\"M0 0h24v24H0z\\\" fill=\\\"none\\\"\\/>\\n            <path d=\\\"M22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM7.88 3.39L6.6 1.86 2 5.71l1.29 1.53 4.59-3.85zM12.5 8H11v6l4.75 2.85.75-1.23-4-2.37V8zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z\\\"\\/>\\n        <\\/svg>\\n        <span class=\\\"inline-block\\\">\\u672c\\u9898\\u5c06\\u4e8e <span class=\\\"detail-time\\\"><\\/span> \\u540e\\u81ea\\u52a8\\u5173\\u95ed<\\/span>\\n        <button class=\\\"btn teal lighten-3 btn-unfold\\\">\\n            <i class=\\\"icon icon-triangle-down\\\"><\\/i>\\n            <i class=\\\"icon icon-triangle-up\\\"><\\/i>\\n            <span class=\\\"tip z-depth-3\\\">\\u70b9\\u51fb\\u5c55\\u5f00\\u5012\\u8ba1\\u65f6\\u5de5\\u5177<\\/span>\\n        <\\/button>\\n    <\\/div>\\n    <div class=\\\"inline-block teal-text stop-time ml-10 \\\">\\u53d6\\u6d88\\u9650\\u65f6<\\/div>\\n    <div class=\\\"btn-close waves-effect waves-light inline-block btn white teal-text ml-20\\\">\\u7acb\\u523b\\u5173\\u95ed<\\/div>\\n<\\/div>\\n        <div class=\\\"buttons btns-timing amber lighten-5 hidden\\\">\\n    <div class=\\\"inline-middle grey-text text-darken-3\\\">\\n        <svg class=\\\"inline-middle\\\" fill=\\\"#4a4a4a\\\" height=\\\"24\\\" viewBox=\\\"0 0 24 24\\\" width=\\\"24\\\" xmlns=\\\"http:\\/\\/www.w3.org\\/2000\\/svg\\\">\\n            <path d=\\\"M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z\\\"\\/>\\n            <path d=\\\"M0 0h24v24H0z\\\" fill=\\\"none\\\"\\/>\\n            <path d=\\\"M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z\\\"\\/>\\n        <\\/svg>\\n        <span class=\\\"inline-block\\\">\\u672c\\u9898\\u5c06\\u4e8e <span class=\\\"start-time\\\"><\\/span> \\u5f00\\u542f\\uff0c\\u79bb\\u5f00\\u542f\\u8fd8\\u6709 <span class=\\\"detail-time\\\">-1<\\/span>\\u3002<\\/span>\\n    <\\/div>\\n    <div class=\\\"pull-right\\\">\\n    <div class=\\\"close-timing waves-effect waves-light btn white teal-text\\\">\\u53d6\\u6d88\\u5b9a\\u65f6<\\/div>\\n    <div class=\\\"waves-effect waves-light btn teal ml-20 extend-btn\\\">\\n        <a class=\\\"btn-timing-open inner-btn\\\" href=\\\"javascript:void(0);\\\">\\u7acb\\u523b\\u5f00\\u542f<\\/a>\\n            <\\/div>\\n    <\\/div>\\n<\\/div>\\n    <\\/div>\\n\\n<div class=\\\"answer-content\\\">\\n    <div class=\\\"inner-wrapper\\\">\\n        <div class=\\\"font-size-turner\\\" ctrl=\\\"answer-content\\\">\\n            <button class=\\\"normal\\\">A<\\/button>\\n            <button class=\\\"larger\\\">A<\\/button>\\n        <\\/div>\\n        <div class=\\\"acs-title\\\">\\u7b54\\u6848\\uff1a<\\/div>\\n        <p>12 , 122 , 222 , 3333 , 333344 , 123<\\/p>\\n        <div class=\\\"acs-title\\\">\\u89e3\\u6790\\uff1a<\\/div>\\n        <p><\\/p>\\n    <\\/div>\\n<\\/div>\\n        <div class=\\\"card white answer-info mt-20\\\">\\n    <div class=\\\"right-list\\\">\\n        <h3 class=\\\"right-list-title\\\">\\u7b54\\u9898\\u6982\\u51b5<\\/h3>\\n                    <a class=\\\"export\\\" href=\\\"api\\/export\\/answer?course_id=1092146&question_id=4944168\\\">\\u5bfc\\u51fa\\u6587\\u5b57\\u7b54\\u6848(Excel)<\\/a>\\n                            <div class=\\\"inline-block switch pull-right\\\">\\n            <label>\\n                <input type=\\\"checkbox\\\" class=\\\"switch-answer\\\" name=\\\"review\\\" checked\\/>\\n                <span class=\\\"lever\\\"><\\/span>\\n                \\u516c\\u5e03\\u89e3\\u6790\\n            <\\/label>\\n        <\\/div>\\n                                <div class=\\\"inline-block switch pull-right\\\">\\n                <label class=\\\"grey-text switch-answer-wrapper font-14\\\">\\n                    <input type=\\\"checkbox\\\" class=\\\"switch-answer\\\" \\/>\\n                    <span class=\\\"lever\\\"><\\/span>\\u516c\\u5e03\\u7b54\\u6848\\n                <\\/label>\\n            <\\/div>\\n                       \\n        <div class=\\\"inline-block switch pull-right\\\">\\n            <label>\\n                <input type=\\\"checkbox\\\" class=\\\"switch-group\\\" name=\\\"group\\\" \\/>\\n                <span class=\\\"lever\\\"><\\/span>\\n                \\u6309\\u5206\\u7ec4\\u663e\\u793a\\n            <\\/label>\\n        <\\/div>\\n                <div class=\\\"clearfix\\\"><\\/div>\\n        <div class=\\\"green-line\\\"><\\/div>\\n        <div class=\\\"group-chart-container\\\">\\n        <\\/div>\\n        <div class=\\\"right-list-content\\\">\\n            <h3 class=\\\"right-list-title\\\">\\n                            \\u6b63\\u786e\\u4eba\\u5458\\u540d\\u5355\\n                \\uff08<span class=\\\"right-count\\\">0<\\/span>\\/<span class=\\\"answer-count\\\">1<\\/span>\\uff09\\n                        <\\/h3>\\n            <div class=\\\"green-line\\\"><\\/div>\\n                            <ul class=\\\"top-list\\\">\\n                                        <\\/ul>\\n                                                        <div class=\\\"rest-list\\\">\\n                                        <\\/div>\\n                                <\\/div>\\n    <\\/div>\\n                <div class=\\\"error-list-wrap\\\">\\n            <div class=\\\"error-list hidden\\\">\\n    <h3 class=\\\"right-list-title\\\">\\n        \\u9519\\u8bef\\u7b54\\u6848        <div class=\\\"student-name-btn\\\">\\n            <input type=\\\"checkbox\\\" class=\\\"filled-in\\\" id=\\\"student-name\\\" \\/>\\n            <label for=\\\"student-name\\\">\\u663e\\u793a\\u5b66\\u751f\\u540d\\u5b57<\\/label>\\n        <\\/div>\\n    <\\/h3>\\n    <div class=\\\"green-line\\\"><\\/div>\\n    <ul class=\\\"students-answer-list\\\">\\n        <div class=\\\"font-size-turner\\\" ctrl=\\\"students-answer-list\\\">\\n            <button class=\\\"normal\\\">A<\\/button>\\n            <button class=\\\"larger\\\">A<\\/button>\\n        <\\/div>\\n                    <li class=\\\"error-item\\\">\\n              <span class=\\\"student-name hidden\\\">\\u7eaa\\u6587\\u5e7f: <\\/span>\\n              \\u90ed\\u7687\\u540e , dd , \\u77ed\\u53d1 , \\u521a\\u597d , \\u5c71\\u4e1c , \\u4f1a\\u540e\\u6094\\n                              <div class=\\\"answer-image-wrapper\\\">\\n                                  <\\/div>\\n                          <\\/li>\\n            <\\/ul>\\n<\\/div>\\n<button class=\\\"btn error-btn-show\\\">\\u67e5\\u770b\\u9519\\u8bef\\u7b54\\u6848<\\/button>\\n\\n        <\\/div>\\n            <div class=\\\"error-info-wrap\\\">\\n        <div class=\\\"error-student-list hidden\\\">\\n    <h3 class=\\\"right-list-title\\\">\\n                                    \\u672a\\u7b54\\u9898\\u4eba\\u5458\\u540d\\u5355(0)\\n                <span class=\\\"color-black\\\"><i class=\\\"icon-black\\\"><\\/i>\\u672a\\u7b54<\\/span>\\n                <span class=\\\"color-orange\\\"><i class=\\\"icon-orange\\\"><\\/i>\\u7b54\\u9519<\\/span>\\n                <span class=\\\"color-green\\\"><i class=\\\"icon-green\\\"><\\/i>\\u7b54\\u5bf9<\\/span>\\n                        <\\/h3>\\n    <div class=\\\"green-line\\\"><\\/div>\\n    <ul>\\n            <\\/ul>\\n<\\/div>\\n\\n<button class=\\\"btn error-student-show \\\" >\\n                        \\u67e5\\u770b\\u672a\\u7b54\\u9898\\u4eba\\u5458\\u540d\\u5355\\n            <\\/button>\\n    <\\/div>\\n    \\n    <\\/div>\\n\\n        <div class=\\\"clock-container hidden\\\">\\n    <div class=\\\"wave4 wave\\\"><\\/div>\\n    <div class=\\\"wave3 wave\\\"><\\/div>\\n    <div class=\\\"wave2 wave\\\"><\\/div>\\n    <div class=\\\"wave1 wave\\\"><\\/div>\\n    <div class=\\\"bubble\\\"><\\/div>\\n    <div id=\\\"counter\\\">\\n        <div id=\\\"counter_item1\\\" class=\\\"counter_item\\\">\\n            <div class=\\\"digit digit0\\\">0<\\/div>\\n        <\\/div>\\n        <div id=\\\"counter_item2\\\" class=\\\"counter_item\\\">\\n            <div class=\\\"digit digit0\\\">0<\\/div>\\n        <\\/div>\\n        <div id=\\\"counter_item3\\\" class=\\\"counter_item\\\">\\n            <div class=\\\"digit digit_colon\\\">:<\\/div>\\n        <\\/div>\\n        <div id=\\\"counter_item4\\\" class=\\\"counter_item\\\">\\n            <div class=\\\"digit digit0\\\">0<\\/div>\\n        <\\/div>\\n        <div id=\\\"counter_item5\\\" class=\\\"counter_item\\\">\\n            <div class=\\\"digit digit0\\\">0<\\/div>\\n        <\\/div>\\n    <\\/div>\\n    <button class=\\\"btn teal lighten-3 btn-fold\\\">\\n        <i class=\\\"icon icon-triangle-up\\\"><\\/i>\\n        <span class=\\\"tip z-depth-3\\\">\\u70b9\\u51fb\\u6536\\u8d77\\u5012\\u8ba1\\u65f6\\u5de5\\u5177<\\/span>\\n    <\\/button>\\n<\\/div>\\n\\n    <\\/div>\\n<div id=\\\"finish-tip\\\"><\\/div>\"},\"msg\":\"success\"}";
    }

    @RequestMapping(value = "question_edit", method = RequestMethod.POST)
    public Map<String, Object> question_edit(Integer course_id, Integer question_id) {
        return questionService.selectById(course_id, question_id);
//        return "{\"question_id\":\"4944168\",\"answer\":[\"12\",\"122\",\"222\",\"3333\",\"333344\",\"123\"],\"content\":\"\\u003Cp\\u003Easdf\\u003C\\/p\\u003E\\u003Chr\\u003E\\u003Cp\\u003E____ ____ ____ ____ ____ ____&nbsp;\\u003C\\/p\\u003E\",\"answer_content\":\"{}\",\"pic_content\":\"{}\",\"type\":\"2\",\"difficulty\":\"1\",\"chapter_id\":\"0\",\"library_id\":\"103428\",\"answer_duration\":\"5\",\"is_item_score\":1,\"case_sensitive\":0,\"strict\":0,\"answered\":\"1\",\"course_info\":{\"course_id\":\"1092146\",\"name\":\"233\",\"library_id\":\"103428\"},\"chapter_info\":[]}";
    }
}
