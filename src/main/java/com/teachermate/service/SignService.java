package com.teachermate.service;

import com.teachermate.pojo.Sign;

import java.util.Map;
import java.util.List;

public interface SignService {
    Map<String, Object> open_sign(Integer is_gps);

    void delete(Integer id);

    void close(Integer id);

    Sign select_one(Integer id);

    List<Sign> select_list();

    List<Sign> select(Sign sign);
}
