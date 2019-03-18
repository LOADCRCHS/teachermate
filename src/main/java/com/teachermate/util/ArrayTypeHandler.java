package com.teachermate.util;

import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;
import org.apache.ibatis.type.TypeException;

import java.sql.*;

public class ArrayTypeHandler extends BaseTypeHandler<Object[]> {
    private static final String TYPE_NAME_VARCHAR = "varchar";
    private static final String TYPE_NAME_INTEGER = "integer";
    private static final String TYPE_NAME_BOOLEAN = "boolean";
    private static final String TYPE_NAME_NUMERIC = "numeric";

    @Override
    public void setNonNullParameter(PreparedStatement preparedStatement, int param, Object[] parameter, JdbcType jdbcType) throws SQLException {
        String typeName = null;
        if (parameter instanceof Integer[]) {
            typeName = TYPE_NAME_INTEGER;
        } else if (parameter instanceof String[]) {
            typeName = TYPE_NAME_VARCHAR;
        } else if (parameter instanceof Boolean[]) {
            typeName = TYPE_NAME_BOOLEAN;
        } else if (parameter instanceof Double[]) {
            typeName = TYPE_NAME_NUMERIC;
        }
        if (typeName == null) {
            throw new TypeException("ArrayTypeHandler parameter typeName error, your type is " + parameter.getClass().getName());
        }
        Connection connection = preparedStatement.getConnection();
        Array array = connection.createArrayOf(typeName, parameter);
        preparedStatement.setArray(param, array);
    }

    @Override
    public Object[] getNullableResult(ResultSet resultSet, String column_name) throws SQLException {
        return getArray(resultSet.getArray(column_name));
    }

    @Override
    public Object[] getNullableResult(ResultSet resultSet, int column_index) throws SQLException {
        return getArray(resultSet.getArray(column_index));
    }

    @Override
    public Object[] getNullableResult(CallableStatement callableStatement, int column_index) throws SQLException {
        return getArray(callableStatement.getArray(column_index));
    }

    private Object[] getArray(Array array) {
        if (array == null) {
            return null;
        }
        try {
            return (Object[]) array.getArray();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
