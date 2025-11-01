package cloud.underwaise.enums;

import lombok.Getter;

@Getter
public enum Risk {
    NONE("none"),
    LOW("low"),
    MODERATE("moderate"),
    HIGH("high"),
    SEVERE("severe");

    private final String value;

    Risk(String value) {
        this.value = value;
    }

    public static Risk fromValue(Integer value) {
        if (value <= 2) {
            return NONE;
        } else if (value <= 4) {
            return LOW;
        } else if (value <= 6) {
            return MODERATE;
        } else if (value <= 8) {
            return HIGH;
        }
        return SEVERE;
    }
}
