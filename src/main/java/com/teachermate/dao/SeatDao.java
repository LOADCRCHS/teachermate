package com.teachermate.dao;

import com.teachermate.pojo.Seat;

import java.util.List;

public interface SeatDao {

    void create(Seat seat);

    void update(Seat seat);

    void delete(Integer seat_id);

    Seat selectById(Integer seat_id);

    List<Seat> selectByCourseId(Integer seat_id);

    List<Seat> select(Seat seat);
}
