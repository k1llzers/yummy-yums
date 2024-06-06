package org.naukma.yummyyams.family;

import org.naukma.yummyyams.user.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FamilyRepository extends JpaRepository<FamilyEntity, Integer> {
    List<FamilyEntity> findAllByParticipantsContains(UserEntity participants);

    List<FamilyEntity> findAllByRequestsContains(UserEntity participants);
}
