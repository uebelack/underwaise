package cloud.underwaise.enums;

import lombok.Getter;

@Getter
public enum YesNo {
    YES("yes", true),
    NO("no", false);

    private final String value;
    private final boolean booleanValue;

    YesNo(String value, boolean booleanValue) {
        this.value = value;
        this.booleanValue = booleanValue;
    }

    public static YesNo fromValue(boolean value) {
        return value ? YES : NO;
    }
}
