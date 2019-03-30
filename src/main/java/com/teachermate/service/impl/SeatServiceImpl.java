package com.teachermate.service.impl;

import com.teachermate.dao.SeatDao;
import com.teachermate.pojo.Seat;
import com.teachermate.service.SeatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SeatServiceImpl implements SeatService {
    @Autowired
    private SeatDao seatDao;



    @Override
    public void create(Seat seat) {
        seatDao.create(seat);
    }

    @Override
    public void update(Seat seat) {
        seatDao.update(seat);
    }

    @Override
    public void delete(Integer seat_id) {
        seatDao.delete(seat_id);
    }

    @Override
    public Seat selectById(Integer seat_id) {
        return seatDao.selectById(seat_id);
    }

    @Override
    public List<Seat> selectByCourseId(Integer courseId) {
        return seatDao.selectByCourseId(courseId);
    }

    @Override
    public List<Seat> select(Seat seat) {
        return seatDao.select(seat);
    }
}
