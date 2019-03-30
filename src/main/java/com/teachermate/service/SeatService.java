package com.teachermate.service;

import com.teachermate.pojo.Seat;

import java.util.List;

public interface SeatService {
    void create(Seat seat);

    void update(Seat seat);

    void delete(Integer seat_id);

    Seat selectById(Integer seat_id);

    List<Seat> selectByCourseId(Integer courseId);

    List<Seat> select(Seat seat);
}
