package com.teachermate.dao;

import com.teachermate.pojo.Sign;
import com.teachermate.pojo.SignInfo;
import com.teachermate.pojo.SignInfoDetail;

import java.util.Date;
import java.util.List;

public interface SignDao {
    Integer create(Sign sign);

    void delete(Integer id);

    void close(Integer id);

    Sign select_one(Integer id);

    List<Sign> select_list();

    List<Sign> select(Sign sign);

    List<SignInfo> selectSignInfo(Integer course_id);

    List<SignInfoDetail> selectSignInfoDetail(String date);
}
