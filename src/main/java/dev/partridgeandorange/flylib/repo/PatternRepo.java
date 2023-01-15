package dev.partridgeandorange.flylib.repo;

import dev.partridgeandorange.flylib.model.Pattern;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PatternRepo extends JpaRepository <Pattern, Long> {
    //Query for searching based on type of fly
    @Query(value = "select * from pattern where type_fly like :keyword", nativeQuery = true)
    List<Pattern> findByKeyword(@Param("keyword") String keyword);

    //Query for searching based on pattern name
    @Query(value = "select * from pattern where pattern_name like :keyword", nativeQuery = true)
    List<Pattern> findByName(@Param("keyword") String keyword);

    //Query for searching based on material
    @Query(value = "select * from pattern where material like %:keyword%", nativeQuery = true)
    List<Pattern> findByMaterial(@Param("keyword") String keyword);


    //Query for finding flies with type other
    @Query(value = "select * from pattern where type_fly not like 'wetFly' and type_fly not like 'salmonFly' and type_fly not like 'dryFly' and type_fly not like 'streamer' and type_fly not like 'nymph'", nativeQuery = true)
    List<Pattern> findOther(@Param("keyword") String keyword);
}