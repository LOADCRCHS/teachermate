package com.teachermate.service;

import com.teachermate.pojo.Sign;
import com.teachermate.pojo.SignInfo;

import java.util.List;
import java.util.Map;

public interface SignService {
    Map<String, Object> open_sign(Integer is_gps, Integer course_id);

    void delete(Integer id);

    Sign close(Integer id);

    Sign select_one(Integer id);

    List<Sign> select_list();

    List<Sign> select(Sign sign);

    Sign countMinAndSec(Sign sign);

    List<SignInfo> getHistoryInfo(Integer course_id);
}
