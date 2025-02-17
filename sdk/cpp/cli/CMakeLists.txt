# Copyright 2021 Touca, Inc. Subject to Apache-2.0 License.

include(GNUInstallDirs)

touca_find_package("cxxopts")

add_executable(touca_cli "")

target_sources(
        touca_cli
    PRIVATE
        main.cpp
        filesystem.cpp
        operations.cpp
        compare.cpp
        merge.cpp
        post.cpp
        update.cpp
        view.cpp
)

set_target_properties(
        touca_cli
    PROPERTIES
        OUTPUT_NAME touca_cli
)

target_link_libraries(
        touca_cli
    PRIVATE
        ${TOUCA_TARGET_MAIN}
        cxxopts::cxxopts
)

target_compile_definitions(
        touca_cli
    PRIVATE
        $<$<CXX_COMPILER_ID:MSVC>:_WIN32_WINNT=0x0601>
        $<$<CXX_COMPILER_ID:MSVC>:_CRT_SECURE_NO_WARNINGS>
)

source_group(
    TREE
        ${CMAKE_CURRENT_LIST_DIR}
    FILES
        $<TARGET_PROPERTY:touca_cli,SOURCES>
)

install(
    TARGETS touca_cli
    RUNTIME DESTINATION ${CMAKE_INSTALL_BINDIR}
)
