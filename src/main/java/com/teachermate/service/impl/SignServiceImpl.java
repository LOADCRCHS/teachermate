package com.teachermate.service.impl;

import com.teachermate.dao.SignDao;
import com.teachermate.pojo.Sign;
import com.teachermate.pojo.SignInfo;
import com.teachermate.pojo.SignInfoDetail;
import com.teachermate.service.SignService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class SignServiceImpl implements SignService {
    @Autowired
    public SignDao signDao;

    @Override
    public Map<String, Object> open_sign(Integer is_gps, Integer course_id) {
        Map<String, Object> result = new HashMap<>();
        Sign sign = new Sign();
        sign.setIsGps(is_gps == null ? 0 : is_gps);
        sign.setCourse_id(course_id);
        signDao.create(sign);
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
    public Sign countMinAndSec(Sign sign) {
        if (sign == null) {
            return null;
        }
        long duration = sign.getClose_time().getTime() - sign.getDate().getTime();
        int minutes = (int) (duration / (1000 * 60));
        int seconds = (int) (duration / 1000);
        sign.setMinutes(minutes);
        sign.setSeconds(seconds);
        return sign;
    }

    @Override
    public List<SignInfo> getHistoryInfo(Integer course_id) {
        List<SignInfo> signInfos = signDao.selectSignInfo(course_id);
//        signInfos.sort(new Comparator<SignInfo>() {
//            @Override
//            public int compare(SignInfo o1, SignInfo o2) {
//                return o1.getDate().compareTo(o2.getDate());
//            }
//        });
//        signInfos.sort((o1, o2) -> o1.getDate().compareTo(o2.getDate()));
//        signInfos.sort(Comparator.comparing(SignInfo::getDate));
        for (SignInfo signInfo : signInfos) {
            List<SignInfoDetail> signInfoDetails = signDao.selectSignInfoDetail(signInfo.getDate(), course_id);
            signInfo.setDetails(signInfoDetails);
        }
        return signInfos;
    }
}
