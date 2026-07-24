# What Moving from PHP/CodeIgniter to Java & Spring Boot Taught Me

After more than four years building production applications in PHP and CodeIgniter, I joined Tata
Consultancy Services and shifted into enterprise Java development with Spring Boot. Here's what I
learned during that transition.

## What transferred immediately

- **MVC thinking.** CodeIgniter's controller/model/view separation mapped cleanly onto Spring's
  controller/service/repository layering. The mental model didn't change — the syntax did.
- **REST API design instincts.** Years of building APIs consumed by Angular front ends meant I already
  understood resource modeling, status codes, and versioning trade-offs.
- **SQL fluency.** MySQL query and schema design experience carried over directly to working with
  PostgreSQL and JPA/Hibernate.

## What didn't transfer — and had to be learned

```java
@RestController
@RequestMapping("/api/v1/projects")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjectDto> getProject(@PathVariable Long id) {
        return ResponseEntity.ok(projectService.findById(id));
    }
}
```

- **Static typing discipline.** PHP's dynamic typing forgives a lot. Java's compiler catches entire
  classes of bugs before they ship — but it demanded a more deliberate design-first approach.
- **Dependency injection as a first-class concept.** Spring's IoC container formalizes something
  CodeIgniter only loosely encourages through its loader.
- **Build tooling.** Maven's lifecycle and dependency management is a different discipline from
  Composer, particularly around multi-module projects.

## How I ramped up

1. Rebuilt a small internal tool I knew well in PHP as a Spring Boot service, so I could compare
   designs directly rather than learning in the abstract.
2. Leaned on strict TypeScript habits from Angular work to make Java's type system feel familiar
   rather than restrictive.
3. Paired closely with senior Java engineers on code review, treating every comment as a mini lesson
   in idiomatic Spring.

## The takeaway

Switching backend ecosystems after years of specialization is less about learning new syntax and more
about un-learning shortcuts that a dynamic language quietly allowed. The fundamentals — clean
separation of concerns, well-designed APIs, and a bias toward simplicity — travel with you.
