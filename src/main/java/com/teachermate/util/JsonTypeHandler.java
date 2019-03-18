package com.teachermate.util;

import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class JsonTypeHandler<T extends Object> extends BaseTypeHandler<T> {

    private Class<T> clazz;

    public JsonTypeHandler(Class<T> clazz) {
        if (clazz == null) throw new IllegalArgumentException("Type argument cannot be null");
        this.clazz = clazz;
    }

    @Override
    public void setNonNullParameter(PreparedStatement preparedStatement, int i, T param, JdbcType jdbcType) throws SQLException {
        preparedStatement.setString(i,JsonUtil.toJson(param));
    }

    @Override
    public T getNullableResult(ResultSet resultSet, String column_name) throws SQLException {
        return JsonUtil.toObject(resultSet.getString(column_name),clazz);
    }

    @Override
    public T getNullableResult(ResultSet resultSet, int column_index) throws SQLException {
        return JsonUtil.toObject(resultSet.getString(column_index),clazz);
    }

    @Override
    public T getNullableResult(CallableStatement callableStatement, int column_index) throws SQLException {
        return JsonUtil.toObject(callableStatement.getString(column_index),clazz);
    }
}
