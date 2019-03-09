package com.teachermate.service;

import com.teachermate.pojo.Sign;

import java.util.List;

public interface SignService {
    Sign create(boolean is_gps);

    void update(Sign sign);

    Sign select_one(Integer id);

    List<Sign> select_list();

    List<Sign> select(Sign sign);
}
