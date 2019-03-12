package com.teachermate.pojo;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Data
public class Sign {
    private Integer id;
    //@DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date date;
    private Integer isGps;
    private String ratio;
    private String sign_student_count;
    private boolean isQr;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date close_time;
    private Integer ttl = 299;
    private String tpl;
    private Map<String, Object> signDistribution = new HashMap<>();
    private Integer order = 1;

    public String getGps() {
        return isGps + "";
    }

    public boolean getIsQr() {
        return isQr;
    }

    public void setIsQr(boolean isQr) {
        this.isQr = isQr;
    }
}
