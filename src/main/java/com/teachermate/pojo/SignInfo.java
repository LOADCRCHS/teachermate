package com.teachermate.pojo;

import lombok.Data;

import java.util.List;

@Data
public class SignInfo {
    private String date;
    private String count;
    private List<SignInfoDetail> signHistoryDetail;
    //private boolean isWx;

}
