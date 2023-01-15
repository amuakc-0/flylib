package dev.partridgeandorange.flylib.control;

import dev.partridgeandorange.flylib.model.Pattern;
import dev.partridgeandorange.flylib.repo.PatternRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/pattern")
@CrossOrigin

public class PatternController {
    @Autowired
    PatternRepo patternRepo;

    //Endpoint for addPattern
    @PostMapping("/addpattern")
    public String add(@RequestParam(value = "patternArray[]") String[] patternArray) {

        String pattern_name = patternArray[0];
        String type_fly = patternArray[1];
        String hook_size = patternArray[2];
        String hook_type = patternArray[3];
        String material = patternArray[4];
        String instruction = patternArray[5];
        String image_url = patternArray[6];


        Pattern pattern = new Pattern(pattern_name, type_fly, hook_size, hook_type, material, instruction, image_url);
        patternRepo.save(pattern);
        System.out.println("Saved: " + pattern);


        return null;
    }

    //Endpoint for getpatterns
    @RequestMapping(value = "/getpatterns", method = RequestMethod.GET)
    public @ResponseBody List<Pattern> getPattern() {
        List<Pattern> i = patternRepo.findAll();

        return i;

    }

    //Endpoint for pattern
    @RequestMapping(value = "/findpattern", method = RequestMethod.GET)
    public @ResponseBody Optional<Pattern> findPattern(@RequestParam Long id) {
        Optional<Pattern> patternFound = patternRepo.findById(id);

        return patternFound;

    }
    //Endpoint for findbykey
    @RequestMapping(value = "/findbykey", method = RequestMethod.GET)
    public @ResponseBody List<Pattern> findPatternByKey(@RequestParam String keyword) {
        List<Pattern> patternFoundbyKey = patternRepo.findByKeyword(keyword);

        return patternFoundbyKey;

    }


    //Endpoint for findbyname
    @RequestMapping(value = "/findbyname", method = RequestMethod.GET)
    public @ResponseBody List<Pattern> findPatternByName(@RequestParam String keyword) {
        List<Pattern> patternFoundbyName = patternRepo.findByName(keyword);

        return patternFoundbyName;

    }

    //Endpoint for findbymaterial
    @RequestMapping(value = "/findbymaterial", method = RequestMethod.GET)
    public @ResponseBody List<Pattern> findPatternByMaterial(@RequestParam String keyword) {
        List<Pattern> patternFoundbyMaterial = patternRepo.findByMaterial(keyword);

        return patternFoundbyMaterial;

    }

    //Endpoint for upload

    @PostMapping("/upload")
    public ResponseEntity<?> handleFileUpload(@RequestParam("file") MultipartFile file ) {

        String fileName = file.getOriginalFilename();
        try {
            file.transferTo( new File("C:\\Users\\mpart\\Documents\\Plugg\\SU\\Webbutveckling I\\Gesällprov\\images\\" + fileName));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        return ResponseEntity.ok("File uploaded successfully.");
    }

}