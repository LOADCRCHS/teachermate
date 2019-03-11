package com.teachermate.service.impl;

import com.teachermate.dao.SignDao;
import com.teachermate.pojo.Sign;
import com.teachermate.service.SignService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class SignServiceImpl implements SignService {
    @Autowired
    public SignDao signDao;

    @Override
    public Map<String, Object> open_sign(Integer is_gps) {
        Map<String, Object> result = new HashMap<>();
        Sign sign = new Sign();
        sign.setIsGps(is_gps);
        sign.setId(signDao.create(sign));
        result.put("sign", sign);
        return result;
    }

    @Override
    public void delete(Integer id) {
        signDao.delete(id);
    }

    @Override
    public Sign close(Integer id) {
        if (id == null) {
            return null;
        }
        signDao.close(id);
        return signDao.select_one(id);
    }

    @Override
    public Sign select_one(Integer id) {
        return signDao.select_one(id);
    }

    @Override
    public List<Sign> select_list() {
        return signDao.select_list();
    }

    @Override
    public List<Sign> select(Sign sign) {
        return signDao.select(sign);
    }

    @Override
    public Sign setSignTpl(Sign sign) {
        if (sign == null) {
            return null;
        }
        sign.setTpl("<div class='student-contaner'>" +
                "<div class='delete-btn'>" +
                "<i class='icon icon-delete'>" +
                "删除本次签到" +
                "</div>" +
                "<section class='student-info'>" +
                "<p class='sign-title'>" +
                "本次签到开启于2019-03-11 23:03:18" +
                "</p>" +
                "<div class='sign-info grey-text'>" +
                "<p>" +
                "出勤" +
                "</p>" +
                "<p class='grey-text text-darken-2'>" +
                "<span class='sign-num'>" +
                "0" +
                "</span>" +
                "人" +
                "</p>" +
                "</div>" +
                "<div class='sign-info grey-text'>" +
                "<p>" +
                "出勤率" +
                "</p>" +
                "<p class='grey-text text-darken-2'>" +
                "<span class='sign-num'>" +
                "0" +
                "</span>" +
                "%" +
                "</p>" +
                "</div>" +
                "<div class='sign-info grey-text'>" +
                "<p>" +
                "签到开启时长" +
                "</p>" +
                "<p class='grey-text text-darken-2'>" +
                "<span class='sign-num'>" +
                "0" +
                "</span>" +
                "分" +
                "<span class='sign-num'>" +
                "4" +
                "</span>" +
                "秒" +
                "</p>" +
                "</div>" +
                "</section>" +
                "<ul class='student-list'>" +
                "</ul>" +
                "<div class='long-line hidden'>" +
                "</div>" +
                "<ul class='rest-list'>" +
                "</ul>" +
                "<div class='no-sign-list'>" +
                "<h3>" +
                "未签到人员名单：" +
                "<span class='color-black'>" +
                "<i class='icon-black'>" +
                "</i>" +
                "旷课" +
                "</span>" +
                "<span class='color-green'>" +
                "<i class='icon-green'>" +
                "</i>" +
                "正常(签到成功)" +
                "</span>" +
                "<span class='color-red'>" +
                "<i class='icon-red'>" +
                "</i>" +
                "迟到" +
                "</span>" +
                "<span class='color-orange'>" +
                "<i class='icon-orange'>" +
                "</i>" +
                "请假" +
                "</span>" +
                "</h3>" +
                "<ul>" +
                "<li title='纪文广 2015045588' class='                color-black            '" +
                "data-state='0' data-sid='2192660' title='纪文广'>" +
                "<button class='state-btn'>" +
                "修改" +
                "</button>" +
                "<span>" +
                "纪文广" +
                "</span>" +
                "</li>" +
                "</ul>" +
                "</div>" +
                "</div>");
        return sign;
    }
}
