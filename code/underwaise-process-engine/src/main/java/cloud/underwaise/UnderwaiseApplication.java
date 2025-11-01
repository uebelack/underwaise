/*
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership. Camunda licenses this file to you under the Apache License,
 * Version 2.0; you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package cloud.underwaise;

import cloud.underwaise.model.ApplicationForm;
import cloud.underwaise.services.UnderwritingService;
import com.github.javafaker.Faker;
import org.cibseven.bpm.engine.ProcessEngine;
import org.cibseven.bpm.spring.boot.starter.annotation.EnableProcessApplication;
import org.cibseven.bpm.spring.boot.starter.event.PostDeployEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.event.EventListener;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.time.ZoneId;

@SpringBootApplication
@EnableProcessApplication
@EnableJpaRepositories
public class UnderwaiseApplication {

    @Autowired
    private UnderwritingService underwritingService;

    @Autowired
    private ProcessEngine processEngine;

    public static void main(String... args) {
        SpringApplication.run(UnderwaiseApplication.class, args);
    }

    @EventListener
    public void processPostDeploy(PostDeployEvent event) {
        if (System.getenv().containsKey("UNDERWAISE_TEST_EMAIL")) {
            var underwaiseTestEmail = System.getenv("UNDERWAISE_TEST_EMAIL");
            var applicationForm = new ApplicationForm();
            applicationForm.setEmail(underwaiseTestEmail);
            applicationForm.setHobbies(Faker.instance().howIMetYourMother().catchPhrase());
            applicationForm.setFirstName(Faker.instance().name().firstName());
            applicationForm.setLastName(Faker.instance().name().lastName());
            applicationForm.setBirthDate(Faker.instance().date().birthday().toInstant()
                    .atZone(ZoneId.systemDefault())
                    .toLocalDate());
            applicationForm.setHealthConditions(Faker.instance().backToTheFuture().quote());
            underwritingService.start(applicationForm);
        }
    }
}