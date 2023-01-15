package dev.partridgeandorange.flylib.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import org.springframework.data.annotation.Id;

@Entity
public class Pattern {

    //Variables (attributes of object)
    @jakarta.persistence.Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String pattern_name;
    private String type_fly;
    private String hook_size;
    private String hook_type;
    private String material;
    private String instruction;

    private String image_url;

    //Constructors
    public Pattern(String pattern_name, String type_fly, String hook_size, String hook_type, String material, String instruction, String image_url) {
        this.pattern_name = pattern_name;
        this.type_fly = type_fly;
        this.hook_size = hook_size;
        this.hook_type = hook_type;
        this.material = material;
        this.instruction = instruction;
        this.image_url = image_url;
    }

    public Pattern() {

    }

    //Getters and Setters

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getPattern_name() {
        return pattern_name;
    }

    public void setPattern_name(String pattern_name) {
        this.pattern_name = pattern_name;
    }

    public String getType_fly() {
        return type_fly;
    }

    public void setType_fly(String type_fly) {
        this.type_fly = type_fly;
    }

    public String getHook_size() {
        return hook_size;
    }

    public void setHook_size(String hook_size) {
        this.hook_size = hook_size;
    }

    public String getHook_type() {
        return hook_type;
    }

    public void setHook_type(String hook_type) {
        this.hook_type = hook_type;
    }

    public String getMaterial() {
        return material;
    }

    public void setMaterial(String material) {
        this.material = material;
    }

    public String getInstruction() {
        return instruction;
    }

    public void setInstruction(String instruction) {
        this.instruction = instruction;
    }

    public String getImage_url() {
        return image_url;
    }

    public void setImage_url(String image_url) {
        this.image_url = image_url;
    }

    @Override
    public String toString() {
        return "Pattern{" +
                "id=" + id +
                ", pattern_name='" + pattern_name + '\'' +
                ", type_fly='" + type_fly + '\'' +
                ", hook_size='" + hook_size + '\'' +
                ", hook_type='" + hook_type + '\'' +
                ", material='" + material + '\'' +
                ", instruction='" + instruction + '\'' +
                ", image_url='" + image_url + '\'' +
                '}';
    }
}
